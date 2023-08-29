package com.zerohip.server.user.service;

import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.exception.ExceptionCode;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.security.utils.CustomAuthorityUtils;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    public User createUser(User user) {

        verifyExistsLoginId(user.getLoginId());
        verifyExistsEmail(user.getEmail());

        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(user.getLoginId());
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        return savedUser;

        /**
         * 이메일 인증 로직 구현 후, ApplicationEventPublisher 와 MemberRegistrationEventListener 를 활용해
         * 유저 정보 등록/수정 등의 이벤트가 일어날 경우 알림 메일 전송하는 로직 구현 가능
         */
    }



    @Override
    public User updateUser(String loginId, User user) {

        findVerifyUserByLoginId(loginId);
        User findUser = findVerifyUserByLoginId(user.getLoginId());


        Optional.ofNullable(user.getNickname())
                .ifPresent(nickname -> findUser.setNickname(nickname));
        Optional.ofNullable(user.getPassword())
                .ifPresent(password -> findUser.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(user.getProfileImgPath())
                .ifPresent(profileImgPath -> findUser.setProfileImgPath(profileImgPath));

        return userRepository.save(findUser);
    }

    @Override
    public Page<User> findUserPage(String loginId, int page, int size) {

        User user = findUserByLoginId(loginId);

        return userRepository.findByUser(user, PageRequest.of(page - 1, size, Sort.by("createdAt").descending()));
    }



    @Override
    public User findUserByUserId(Long userId) {

        return findVerifyUserByUserId(userId);
    }

    @Override
    public User findUserByLoginId(String loginId) {

        return findVerifyUserByLoginId(loginId);
    }

    @Override
    public User findUserByEmail(String email) {

        return findVerifyUserByEmail(email);
    }


    @Override
    public List<User> findUsers() {
        return null;
    }




    @Override
    public void deleteUser(String authorId, String password) {

        User findUser = findVerifyUserByLoginId(authorId);
        if (checkedPassword(findUser, password)) userRepository.delete(findUser);
    }





    // ------------------- 검증 메서드 --------------------------



    private User findVerifyUserByLoginId(String loginId) {

        Optional<User> optionalUser = userRepository.findUserByLoginId(loginId);
        User foundUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return foundUser;
    }

    private User findVerifyUserByUserId(Long userId) {

        Optional<User> optionalUser = userRepository.findUserByUserId(userId);
        User foundUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return foundUser;
    }


    private void verifyExistsLoginId(String loginId) {

        Optional<User> user = userRepository.findUserByLoginId(loginId);
        if (user.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.LOGINId_EXISTS);
        }
    }


    private User findVerifyUserByEmail(String email) {

        Optional<User> optionalUser = userRepository.findUserByEmail(email);
        User foundUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return foundUser;
    }



    private void verifyExistsEmail(String email) {

        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
        }
    }

    private Boolean checkedPassword(User author, String password) {

        String originPassword = author.getPassword();

        if (passwordEncoder.matches(password, originPassword)) {
            return true;
        }
        else throw new BusinessLogicException(ExceptionCode.PASSWORD_MISMATCH);
    }

}
