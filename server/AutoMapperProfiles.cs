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
        CreateMap<ListTag, DetailedListTagDTO>().ReverseMap();
        CreateMap<Tag, DefaultTagDTO>().ReverseMap();
        CreateMap<Item, DefaultItemDTO>().ReverseMap();
        CreateMap<List, DefaultListDTO>().ReverseMap();
        CreateMap<List, DetailedListDTO>().ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.ListTags.Select(lt => lt.Tag)));
        CreateMap<ListTag, CreateListTagDTO>().ReverseMap();
        CreateMap<UserProfile, DetailedUserProfileDTO>().ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.IdentityUser.Email)).ReverseMap();
        CreateMap<EbayItem, Notification>()
        .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image.ImageUrl))
        .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price.Value))
        .ForMember(dest => dest.Currency, opt => opt.MapFrom(src => src.Price.CurrencyCode));
        CreateMap<Notification, DefaultNotificationDTO>();
    }
}