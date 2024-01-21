package fr.mightycode.cpoo.server.service;

public interface MessageListener {

    /**
     * @return The name of the domain to listen.
     */
    String getServerDomain();

    /**
     * @return The URL of the router.
     */
    String getRouterUrl();

    /**
     * Notify the listener about an incoming message for its domain.
     *
     * @param message The incoming message.
     */
    void onMessageReceived(RouterService.Message message);
}