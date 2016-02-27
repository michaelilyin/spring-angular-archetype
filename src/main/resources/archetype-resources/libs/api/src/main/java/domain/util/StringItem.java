#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.domain.util;

/**
 *  21.02.2016.
 */
public class StringItem<PK> {
    private PK id;
    private String name;

    public StringItem(PK id, String name) {
        this.id = id;
        this.name = name;
    }

    public PK getId() {
        return id;
    }

    public void setId(PK id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}