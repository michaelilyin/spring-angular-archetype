#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.test;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import ${package}.controller.api.DemoControllerApi;
import ${package}.dto.UserDTO;
import ${package}.service.UserService;

/*TODO: implements it*/
public abstract class UserControllerTest extends BaseControllerTest {

	@Mock
	private UserService userServiceMock;

	@InjectMocks
	private DemoControllerApi demoControllerApi;

    @Before
    public void setUp() {
        super.setUp();
    }

	@Test
	public void getDemoTest() throws Exception {
		UserDTO dto = new UserDTO(1L, "Name", true, 10, 50.34f);
		when(userServiceMock.getDemo(1L)).thenReturn(dto);
		when(userServiceMock.getDemo(2L)).thenReturn(null);

		mockMvc.perform(get("/api/demos/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("${symbol_dollar}.id", is(1)))
				.andExpect(jsonPath("${symbol_dollar}.name", is("Name")))
				.andExpect(jsonPath("${symbol_dollar}.duration", is(10)))
				.andExpect(jsonPath("${symbol_dollar}.cost", is(50.34)));
		
		mockMvc.perform(get("/api/demos/{id}", 2)).andExpect(status().isNotFound());
	}

	@Test
	public void getDemosTest() throws Exception {
//		UserView demo1 = new UserView(1L, "Name 1", true, 10, 50.34f);
//		UserView demo2 = new UserView(2L, "Name 2", true, 10, 50.34f);
//		when(userServiceMock.getDemos())
//				.thenReturn(Arrays.asList(demo1, demo2));
//
//		mockMvc.perform(get("/api/demos")).andExpect(status().isOk())
//				.andExpect(content().contentType(APPLICATION_JSON_UTF8))
//				.andExpect(jsonPath("${symbol_dollar}", hasSize(2)))
//				.andExpect(jsonPath("${symbol_dollar}[0].id", is(1)))
//				.andExpect(jsonPath("${symbol_dollar}[0].name", is("Name 1")))
//				.andExpect(jsonPath("${symbol_dollar}[1].id", is(2)))
//				.andExpect(jsonPath("${symbol_dollar}[1].name", is("Name 2")));
	}

	@Test
	public void postDemoTest() throws Exception {
		String request = "{${symbol_escape}"name${symbol_escape}": ${symbol_escape}"Name${symbol_escape}", ${symbol_escape}"flag${symbol_escape}": true, ${symbol_escape}"duration${symbol_escape}": 10, ${symbol_escape}"cost${symbol_escape}": 50.34}";
		UserDTO post = new UserDTO(null, "Name", true, 10, 50.34f);
		UserDTO ret = new UserDTO(1L, "Name", true, 10, 50.34f);

		when(userServiceMock.createDemo(post)).thenReturn(ret);

		mockMvc.perform(
				post("/api/demos").content(request).contentType(
						APPLICATION_JSON_UTF8)).andExpect(status().isCreated())
				.andExpect(content().contentType(APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("${symbol_dollar}.id", is(1)))
				.andExpect(jsonPath("${symbol_dollar}.name", is("Name")))
				.andExpect(jsonPath("${symbol_dollar}.duration", is(10)))
				.andExpect(jsonPath("${symbol_dollar}.cost", is(50.34)));
	}

	@Test
	public void putDemoTest() throws Exception {
		String request = "{${symbol_escape}"id${symbol_escape}": 1, ${symbol_escape}"name${symbol_escape}": ${symbol_escape}"Name${symbol_escape}", ${symbol_escape}"flag${symbol_escape}": true, ${symbol_escape}"duration${symbol_escape}": 10, ${symbol_escape}"cost${symbol_escape}": 50.34}";
		UserDTO put = new UserDTO(1L, "Name", true, 10, 50.34f);

		mockMvc.perform(
				put("/api/demos/{id}", 1).content(request).contentType(
						APPLICATION_JSON_UTF8)).andExpect(status().isOk());
		verify(userServiceMock, times(1)).updateDemo(put);
		
		mockMvc.perform(
				put("/api/demos/{id}", 2).content(request).contentType(
						APPLICATION_JSON_UTF8)).andExpect(status().isBadRequest());
		verify(userServiceMock, times(1)).updateDemo(put);
	}
	
	@Test
	public void deleteDemoTest() throws Exception {
		mockMvc.perform(
				delete("/api/demos/{id}", 1)).andExpect(status().isOk());

		verify(userServiceMock, times(1)).deleteDemo(1L);
	}

	@Override
	public Object[] getTestingControllerMocks() {
		return new Object[] { demoControllerApi };
	}
}
