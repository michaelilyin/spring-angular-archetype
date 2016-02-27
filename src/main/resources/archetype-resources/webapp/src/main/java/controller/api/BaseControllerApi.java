#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.controller.api;

import ${package}.util.Page;
import ${package}.domain.util.PageSupport;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping(value = "/api")
public class BaseControllerApi {
    protected Page createPageBean(List<? extends PageSupport> views, int page, int count){
        if (views != null && views.size() > 0) {
            int totalCount = views.get(0).getCnt();
            return new Page(views, totalCount, count, page);
        }
        return new Page(views, 0, count, page);
    }
}
