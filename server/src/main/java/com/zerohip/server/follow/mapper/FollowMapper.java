package com.zerohip.server.follow.mapper;

import com.zerohip.server.follow.dto.FollowDto;
import com.zerohip.server.follow.entity.Follow;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FollowMapper {

    @Mapping(source = "followerId.loginId", target = "followerId")
    @Mapping(source = "followingId.loginId", target = "followingId")
    FollowDto.FollowResponseDto followToFollowResponseDto(Follow follow);

}
