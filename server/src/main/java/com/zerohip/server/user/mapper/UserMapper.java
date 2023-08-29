package com.zerohip.server.user.mapper;

import com.zerohip.server.follow.dto.FollowDto;
import com.zerohip.server.follow.entity.Follow;
import com.zerohip.server.user.dto.UserDto;
import com.zerohip.server.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userPostDtoToUser(UserDto.Post userPostDto);
    User userPatchDtoToUser(UserDto.Patch userPatchDto);


    // check

    User checkUserByLoginId(UserDto.CheckLoginId checkLoginIdDto);

    User checkUserByEmail(UserDto.CheckEmail checkEmailDto);
    User checkPasswordToUser(UserDto.CheckPassword checkPasswordDto);


    // response
    UserDto.Response userToUserResponseDto(User user);
    UserDto.PatchResponse userToUserPatchResponseDto(User user);
    UserDto.CheckPasswordResponse userToCheckPasswordResponse(User user);

    List<UserDto.MyPageResponse> userToMyPageResponse(List<User> user);


    @Mapping(source = "followerId.userId", target = "followingId")
    @Mapping(source = "followerId.loginId", target = "loginId")
    @Mapping(source = "followerId.nickname", target = "nickname")
    @Mapping(source = "followerId.profileImgPath", target = "profileImgPath")
    @Mapping(source = "followerId.followed", target = "followed")
    FollowDto.FollowingResponseDto followToFollowingResponseDto(Follow follow);

    @Mapping(source = "followingId.userId", target = "followerId")
    @Mapping(source = "followingId.loginId", target = "loginId")
    @Mapping(source = "followingId.nickname", target = "nickname")
    @Mapping(source = "followingId.profileImgPath", target = "profileImgPath")
    @Mapping(source = "followingId.followed", target = "followed")
    FollowDto.FollowerResponseDto followToFollowerResponseDto(Follow follow);
}
