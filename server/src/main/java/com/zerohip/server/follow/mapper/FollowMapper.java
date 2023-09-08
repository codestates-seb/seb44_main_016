package com.zerohip.server.follow.mapper;

import com.zerohip.server.follow.dto.FollowDto;
import com.zerohip.server.follow.entity.Follow;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FollowMapper {

    @Mapping(source = "followerId.userId", target = "followerId")
    @Mapping(source = "followingId.userId", target = "followingId")
    FollowDto.FollowResponseDto followToFollowResponseDto(Follow follow);
}
