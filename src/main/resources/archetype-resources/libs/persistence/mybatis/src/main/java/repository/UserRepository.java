#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.repository;

import ${package}.domain.User;
import ${package}.domain.UserView;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 *  19.02.2016.
 */
public interface UserRepository extends Repository<Long, User> {
    List<UserView> getUserViews(@Param("page") int page, @Param("count") int count);
}
