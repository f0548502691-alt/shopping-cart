# ---------- build ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything
COPY . .

# Restore + publish the csproj that is inside ShoppingListApi
RUN dotnet restore ./ShoppingListApi/ShoppingListApi.csproj
RUN dotnet publish ./ShoppingListApi/ShoppingListApi.csproj -c Release -o /out

# ---------- runtime ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /out ./

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "ShoppingListApi.dll"]
