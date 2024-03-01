using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookSwap.Models;
using Microsoft.IdentityModel.Tokens;

namespace BookSwap.Services.Authentication;

public class TokenService : ITokenService
    {
        private const int ExpirationMinutes = 30;
        public string CreateToken(ApplicationUser user, string? role)
        {
            var expiration = DateTime.UtcNow.AddMinutes(ExpirationMinutes);
            var token = CreateJwtToken(
                CreateClaims(user, role),
                CreateSigningCredentials(),
                expiration
            );
            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }

        private JwtSecurityToken CreateJwtToken(IEnumerable<Claim> claims, SigningCredentials credentials,
            DateTime expiration) =>
            new(
                Environment.GetEnvironmentVariable("ASPNETCORE_VALIDISSUER"),
                Environment.GetEnvironmentVariable("ASPNETCORE_VALIDAUDIENCE"),
                claims,
                expires: expiration,
                signingCredentials: credentials
            );

        private List<Claim> CreateClaims(ApplicationUser user, string? role)
        {
            try
            {
                if (user is { UserName: not null, Email: not null })
                {
                    var claims = new List<Claim>
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, "TokenForTheApiWithAuth"),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)),
                        new Claim(ClaimTypes.NameIdentifier, user.Id),
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(ClaimTypes.Email, user.Email)
                    };

                    if (!string.IsNullOrEmpty(role))
                    {
                        claims.Add(new Claim(ClaimTypes.Role, role));
                    }

                    return claims;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return new List<Claim>();
        }

        private SigningCredentials CreateSigningCredentials()
        {
            return new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("ASPNETCORE_ISSUERSIGNINGKEY") ?? throw new InvalidOperationException())
                ),
                SecurityAlgorithms.HmacSha256
            );
        }
    }