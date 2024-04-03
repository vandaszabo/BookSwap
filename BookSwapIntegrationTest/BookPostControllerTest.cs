// using System.Net;
// using System.Net.Http.Headers;
// using System.Net.Http.Json;
// using System.Text;
// using BookSwap.Contracts;
// using BookSwap.Data;
// using BookSwap.Models;
// using Microsoft.AspNetCore.Http;
// using Microsoft.VisualStudio.TestPlatform.Utilities;
// using Newtonsoft.Json;
//
// namespace BookSwapIntegrationTest;
//
// public class BookPostControllerTest
// {
//     private CustomWebApplicationFactory _factory;
//     private HttpClient _client;
//     
//     [OneTimeSetUp]
//     public void OneTimeSetUp()
//     {
//         Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Test");
//         Environment.SetEnvironmentVariable("ASPNETCORE_ISSUERSIGNINGKEY", "PlaceholderSigningKey123");
//         Environment.SetEnvironmentVariable("ASPNETCORE_VALIDAUDIENCE", "PlaceholderAudience");
//         Environment.SetEnvironmentVariable("ASPNETCORE_VALIDISSUER", "PlaceholderIssuer");
//         Environment.SetEnvironmentVariable("ASPNETCORE_ADMINEMAIL", "admin@admin.com");
//         Environment.SetEnvironmentVariable("ASPNETCORE_ADMINPASSWORD", "Adminpassword123");
//         _factory = new CustomWebApplicationFactory();
//         _client = _factory.CreateClient();
//     }
//     [OneTimeTearDown]
//     public void OneTimeTearDown()
//     {
//         _factory.Dispose();
//         _client.Dispose();
//     }
//     [Test]
//     public async Task BookPostControllerCRUDTest()
//     {
//         var poster = new ApplicationUser { Id = "userId1", UserName = "User1", Email = "user1@email.com" };
//         var bookPostRequest = new BookPostRequest(
//             "title1",
//             "author1",
//             "desc1",
//             "cat1",
//             "lan1",
//             123,
//             "image1",
//             poster.Id);
//
//         var postResponse = await _client.PostAsync("api/BookPost/Create", new StringContent(JsonConvert.SerializeObject(bookPostRequest),
//             Encoding.UTF8, "application/json"));
//         Console.WriteLine(postResponse);
//
//         // string postResponseString = await postResponse.Content.ReadAsStringAsync();
//         // var bookPostResponse = JsonConvert.DeserializeObject<BookPost>(postResponseString);
//         // Console.WriteLine(bookPostResponse);
//         
//         Assert.That(postResponse.StatusCode, Is.EqualTo(HttpStatusCode.Created));
//         
//         // var initialGetResponse = await _client.GetAsync($"api/BookPost/{postId}");
//         // string responseString = await initialGetResponse.Content.ReadAsStringAsync();
//         // var bookPost = JsonConvert.DeserializeObject<BookPost>(responseString);
//         
//         // Assert.That(bookPostresponse, Is.Not.Null);
//
//         // var newBookPost = new BookPost
//         // {
//         //     PostId = postId,
//         //     Title = "title2",
//         //     Author = "author1",
//         //     Category = "cat1",
//         //     CoverImage = "image1",
//         //     PageCount = 123,
//         //     Language = "hungarian",
//         //     UserId = poster.Id,
//         //     Description = "description1",
//         //     User = poster
//         // };
//         //
//         // var response = await _client.PostAsync("api/BookPost/Update", JsonContent.Create(newBookPost));
//         // string postResponseString = await response.Content.ReadAsStringAsync();
//         //
//         // var deserializedBookPost = JsonConvert.DeserializeObject<BookPost>(postResponseString);
//         // Assert.That(deserializedBookPost.Title, Is.EqualTo("title2"));
//         //
//         // var deleteResponse = await _client.DeleteAsync($"api/BookPost/{postId}");
//         // Assert.That(deleteResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK));
//         // var deleteResponseString = await deleteResponse.Content.ReadAsStringAsync();
//         //
//         // var deletedBookPost = JsonConvert.DeserializeObject<BookPost>(deleteResponseString);
//         // Assert.That(deletedBookPost.PostId, Is.EqualTo(postId));
//     }
// }