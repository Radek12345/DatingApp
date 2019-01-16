using System.Collections.Generic;
using DatingApp.API.Models;
using DatingApp.API.Dtos;

namespace DatingApp.API.Dtos
{
    public class UserForDetailedDto : UserForListDto
    {
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public ICollection<PhotosForDetailedDto> Photos { get; set; }
    }
}