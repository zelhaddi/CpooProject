# ConversationApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAllConversationOfUser**](ConversationApi.md#getAllConversationOfUser) | **GET** /conversation/getAllConversationsOfUser | GET conversation/getAllConversationsOfUser |


<a id="getAllConversationOfUser"></a>
# **getAllConversationOfUser**
> ConversationDisplayDTO getAllConversationOfUser()

GET conversation/getAllConversationsOfUser

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ConversationApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    ConversationApi apiInstance = new ConversationApi(defaultClient);
    try {
      ConversationDisplayDTO result = apiInstance.getAllConversationOfUser();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ConversationApi#getAllConversationOfUser");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ConversationDisplayDTO**](ConversationDisplayDTO.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

