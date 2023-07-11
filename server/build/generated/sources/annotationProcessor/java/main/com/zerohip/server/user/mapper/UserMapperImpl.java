package com.zerohip.server.user.mapper;

import com.zerohip.server.user.dto.UserDto;
import com.zerohip.server.user.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-11T15:36:47+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostDtoToUser(UserDto.Post userPostDto) {
        if ( userPostDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.email( userPostDto.getEmail() );
        user.loginId( userPostDto.getLoginId() );
        user.password( userPostDto.getPassword() );
        user.nickname( userPostDto.getNickname() );

        return user.build();
    }

    @Override
    public User userPatchDtoToUser(UserDto.Patch userPatchDto) {
        if ( userPatchDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.loginId( userPatchDto.getLoginId() );
        user.password( userPatchDto.getPassword() );
        user.nickname( userPatchDto.getNickname() );

        return user.build();
    }

    @Override
    public User checkUserByLoginId(UserDto.CheckLoginId checkLoginIdDto) {
        if ( checkLoginIdDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.loginId( checkLoginIdDto.getLoginId() );

        return user.build();
    }

    @Override
    public User checkUserByEmail(UserDto.CheckEmail checkEmailDto) {
        if ( checkEmailDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.email( checkEmailDto.getEmail() );

        return user.build();
    }

    @Override
    public UserDto.Response userToUserResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.Response response = new UserDto.Response();

        response.setUserId( user.getUserId() );
        response.setEmail( user.getEmail() );
        response.setLoginId( user.getLoginId() );
        response.setPassword( user.getPassword() );
        response.setNickname( user.getNickname() );
        response.setCreatedAt( user.getCreatedAt() );

        return response;
    }

    @Override
    public UserDto.PatchResponse userToUserPatchResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.PatchResponse patchResponse = new UserDto.PatchResponse();

        patchResponse.setUserId( user.getUserId() );
        patchResponse.setEmail( user.getEmail() );
        patchResponse.setLoginId( user.getLoginId() );
        patchResponse.setPassword( user.getPassword() );
        patchResponse.setNickname( user.getNickname() );
        patchResponse.setModifiedAt( user.getModifiedAt() );

        return patchResponse;
    }
}
