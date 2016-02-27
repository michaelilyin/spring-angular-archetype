#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.controller.api;

import ${package}.dto.UserDTO;
import ${package}.util.Page;
import ${package}.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class DemoControllerApi extends BaseControllerApi {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/demos", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Page> getDemos(@RequestParam("page") int page, @RequestParam("rows") int rows) {
		return new ResponseEntity<>(createPageBean(userService.getUsers(page, rows), page, rows), HttpStatus.OK);
	}

	@RequestMapping(value = "/demos/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<UserDTO> getDemo(@PathVariable("id") Long id) {
		UserDTO dto = userService.getDemo(id);
		if (dto != null)
			return new ResponseEntity<>(dto, HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/demos", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<UserDTO> postDemo(@RequestBody UserDTO dto) {
		return new ResponseEntity<>(userService.createDemo(dto),
				HttpStatus.CREATED);
	}

	@RequestMapping(value = "/demos/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> putDemo(@PathVariable("id") Long id,
			@RequestBody UserDTO dto) {
		if (!id.equals(dto.getId()))
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		userService.updateDemo(dto);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/demos/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<?> deleteDemo(@PathVariable("id") Long id) {
		userService.deleteDemo(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
