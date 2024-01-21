package fr.mightycode.cpoo.server.dto;

public record UserCredentialsDTO(String login, String password, String domain, String pictureBase64) {
}
