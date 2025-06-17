using AutoMapper;
using SnagList.DTOs;
using SnagList.Models;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        /*
           Example Paths for mapper
        CreateMap<example, exampleDTO>();
        CreateMap<exampleDTO, example>();

           Example of how to custom handle logic
        CreateMap<Order, DefaultOrderDTO>().ForMember(DTO => DTO.Total, opt => opt.MapFrom(order => order.OrderProducts.Sum(op => op.Product.Price * op.Quantity)));
        */

        CreateMap<UserProfile, DefaultUserProfileDTO>().ReverseMap();
        CreateMap<ListTag, DefaultListTagDTO>().ReverseMap();
        CreateMap<Tag, DefaultTagDTO>().ReverseMap();
        CreateMap<Item, DefaultItemDTO>().ReverseMap();
        CreateMap<List, DefaultListDTO>().ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.ListTags.Select(lt => lt.Tag))).ReverseMap();
        CreateMap<Item, Item>();
    }
}