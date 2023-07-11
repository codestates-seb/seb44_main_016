package com.zerohip.server.user.mapper;

import com.zerohip.server.user.dto.UserDto;
import com.zerohip.server.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userPostDtoToUser(UserDto.Post userPostDto);
    User userPatchDtoToUser(UserDto.Patch userPatchDto);

    User checkUserByLoginId(UserDto.CheckLoginId checkLoginIdDto);

    User checkUserByEmail(UserDto.CheckEmail checkEmailDto);


    // response
    UserDto.Response userToUserResponseDto(User user);
    UserDto.PatchResponse userToUserPatchResponseDto(User user);
}
