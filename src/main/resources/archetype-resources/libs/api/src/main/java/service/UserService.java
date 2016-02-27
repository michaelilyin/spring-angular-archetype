#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.service;

import ${package}.domain.UserView;
import ${package}.dto.UserDTO;

import java.util.List;

public interface UserService {

	List<UserView> getUsers(int page, int count);

	UserDTO getDemo(Long id);

	UserDTO createDemo(UserDTO dto);

	void updateDemo(UserDTO dto);

	void deleteDemo(Long id);

}