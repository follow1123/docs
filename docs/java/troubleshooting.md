---
sidebar_position: 40
---

# 常见问题

## 后端解决跨域的三种方式

* 1. 方法上添加`@CrossOrigin`注解

```java
@PostMapping("/testCors")
@CrossOrigin
public Map<String, String> testCors(){
    return Map.of("name", "123", "age", "123");
}
```

* 2. 配置`CorFilter`滤器

```java
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(source);
    }
}
```

* 3. 实现`WebMvcConfigurer`接口的`addCorsMappings`方法进行配置

```java
@Configuration
public class CorsConfigure implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedHeaders("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(false)
                .maxAge(3600);
    }
}
```

* 配合安全框架的情况下推荐使用`CorFilter`的方式，过滤器会最先执行
