# MessageApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addReactionToMessage**](MessageApi.md#addReactionToMessage) | **POST** /message/addReactionToMessage | POST message/addReactionToMessage |
| [**deleteMessage**](MessageApi.md#deleteMessage) | **DELETE** /message/deleteMessage/{id} | DELETE message/deleteMessage/{id} |
| [**getAllMessageOfConversation**](MessageApi.md#getAllMessageOfConversation) | **POST** /message/getAllMessagesOfConversation | POST message/getAllMessagesOfConversation |
| [**getLastMessageOfConversation**](MessageApi.md#getLastMessageOfConversation) | **POST** /message/getLastMessagesOfConversation | POST message/getLastMessagesOfConversation |
| [**messagePost**](MessageApi.md#messagePost) | **POST** /message | POST message |


<a id="addReactionToMessage"></a>
# **addReactionToMessage**
> MessageReaction addReactionToMessage(messageReaction)

POST message/addReactionToMessage

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.MessageApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    MessageApi apiInstance = new MessageApi(defaultClient);
    MessageReaction messageReaction = new MessageReaction(); // MessageReaction | 
    try {
      MessageReaction result = apiInstance.addReactionToMessage(messageReaction);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling MessageApi#addReactionToMessage");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **messageReaction** | [**MessageReaction**](MessageReaction.md)|  | |

### Return type

[**MessageReaction**](MessageReaction.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

<a id="deleteMessage"></a>
# **deleteMessage**
> ResponseEntity deleteMessage(id)

DELETE message/deleteMessage/{id}

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.MessageApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    MessageApi apiInstance = new MessageApi(defaultClient);
    UUID id = UUID.randomUUID(); // UUID | 
    try {
      ResponseEntity result = apiInstance.deleteMessage(id);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling MessageApi#deleteMessage");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **UUID**|  | |

### Return type

[**ResponseEntity**](ResponseEntity.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

<a id="getAllMessageOfConversation"></a>
# **getAllMessageOfConversation**
> List&lt;Message&gt; getAllMessageOfConversation(userProfileDTO)

POST message/getAllMessagesOfConversation

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.MessageApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    MessageApi apiInstance = new MessageApi(defaultClient);
    UserProfileDTO userProfileDTO = new UserProfileDTO(); // UserProfileDTO | 
    try {
      List<Message> result = apiInstance.getAllMessageOfConversation(userProfileDTO);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling MessageApi#getAllMessageOfConversation");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userProfileDTO** | [**UserProfileDTO**](UserProfileDTO.md)|  | |

### Return type

[**List&lt;Message&gt;**](Message.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

<a id="getLastMessageOfConversation"></a>
# **getLastMessageOfConversation**
> Message getLastMessageOfConversation(userProfileDTO)

POST message/getLastMessagesOfConversation

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.MessageApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    MessageApi apiInstance = new MessageApi(defaultClient);
    UserProfileDTO userProfileDTO = new UserProfileDTO(); // UserProfileDTO | 
    try {
      Message result = apiInstance.getLastMessageOfConversation(userProfileDTO);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling MessageApi#getLastMessageOfConversation");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userProfileDTO** | [**UserProfileDTO**](UserProfileDTO.md)|  | |

### Return type

[**Message**](Message.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

<a id="messagePost"></a>
# **messagePost**
> MessageDTO messagePost(newMessageDTO)

POST message

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.MessageApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    MessageApi apiInstance = new MessageApi(defaultClient);
    NewMessageDTO newMessageDTO = new NewMessageDTO(); // NewMessageDTO | 
    try {
      MessageDTO result = apiInstance.messagePost(newMessageDTO);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling MessageApi#messagePost");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **newMessageDTO** | [**NewMessageDTO**](NewMessageDTO.md)|  | |

### Return type

[**MessageDTO**](MessageDTO.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

