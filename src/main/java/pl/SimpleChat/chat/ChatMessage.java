package pl.SimpleChat.chat;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class ChatMessage {

    private String value;
    private String user;
    private String userColor;
    private Date date;

}
