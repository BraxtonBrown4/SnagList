using AutoMapper;

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
    }
}