using BookSwap.Contracts;
using BookSwap.Models;

namespace BookSwap.Repositories;

public interface ILikeRepository
{
    Task<Like?> Create(Like like);
}