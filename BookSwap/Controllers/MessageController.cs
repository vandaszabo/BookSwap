using BookSwap.Contracts;
using BookSwap.Models;
using BookSwap.Services.Messages;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessageController : ControllerBase
{
    private readonly ILogger<MessageController> _logger;
    private readonly IMessageService _messageService;

    public MessageController(ILogger<MessageController> logger, IMessageService messageService)
    {
        _logger = logger;
        _messageService = messageService;
    }
    
    [HttpPost("Create")]
    public async Task<IActionResult> CreateMessage([FromBody] MessageCreate request)
    {
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var message = new Message
            {
                SenderId = request.SenderId, 
                ReceiverId = request.ReceiverId, 
                MessageText = request.Msg, 
                IsDelivered = false
            };
            var createdMessage = await _messageService.CreateMessage(message);
            _logger.LogInformation($"created message: , {createdMessage}");
            
            if (createdMessage == null)
            {
                return BadRequest("Error creating message.");
            }

            return CreatedAtAction(nameof(CreateMessage), new { id = createdMessage.SenderId }, createdMessage.MessageText);
        }
    }
}