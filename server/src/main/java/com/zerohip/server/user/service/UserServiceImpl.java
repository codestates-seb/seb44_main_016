package com.zerohip.server.user.service;

import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.exception.ExceptionCode;
import com.zerohip.server.security.utils.CustomAuthorityUtils;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
    public User findUser(Long userId) {
        return null;
    }


    @Override
    public List<User> findUsers() {
        return null;
    }


    @Override
    public User updateUser(User user) {
        return null;
    }


    @Override
    public void deleteUser(User user) {

        User findUser = findVerifyUserByLoginId(user.getLoginId());

        userRepository.delete(findUser);
    }


    // ------------------- 검증 메서드 --------------------------

    private User findVerifyUserByLoginId(String loginId) {

        Optional<User> optionalUser = userRepository.findUserByLoginId(loginId);
        User foundUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return foundUser;
    }

    private void verifyExistsLoginId(String loginId) {

        Optional<User> user = userRepository.findUserByLoginId(loginId);
        if (user.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.LoginId_EXISTS);
        }
    }

    private void verifyExistsEmail(String email) {

        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
        }
    }
}
