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




    User checkUserByLoginId(UserDto.CheckLoginId checkLoginIdDto);

    User checkUserByEmail(UserDto.CheckEmail checkEmailDto);
//    User checkPasswordToUser(UserDto.CheckPassword checkPasswordDto);



    UserDto.Response userToUserResponseDto(User user);
    UserDto.PatchResponse userToUserPatchResponseDto(User user);
    UserDto.CheckPasswordResponse userToCheckPasswordResponse(User user);

    UserDto.MyPageResponse userToMyPageResponse(User user);
    UserDto.CheckOtherUserResponse userToCheckOtherUserResponse(User user);


    // follow
    @Mapping(source = "followerId.userId", target = "followingId")
    @Mapping(source = "followerId.email", target = "email")
    @Mapping(source = "followerId.loginId", target = "loginId")
    @Mapping(source = "followerId.nickname", target = "nickname")
    @Mapping(source = "followerId.profileImgPath", target = "profileImgPath")
    FollowDto.FollowingResponseDto followToFollowingResponseDto(Follow follow);

    @Mapping(source = "followingId.userId", target = "followerId")
    @Mapping(source = "followingId.email", target = "email")
    @Mapping(source = "followingId.loginId", target = "loginId")
    @Mapping(source = "followingId.nickname", target = "nickname")
    @Mapping(source = "followingId.profileImgPath", target = "profileImgPath")
    FollowDto.FollowerResponseDto followToFollowerResponseDto(Follow follow);

    @Mapping(source = "followingId.userId", target = "followerId")
    @Mapping(source = "followerId.userId", target = "followingId")
    FollowDto.FollowResponseDto followToFollowResponseDto(Follow follow);
}
