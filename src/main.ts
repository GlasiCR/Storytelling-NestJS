import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
//Tudo começa por este arquivo
//Bootstrap - função responsável por inicializar a aplicação
async function bootstrap() {
  //INestApplication - é a porta de entrada para a aplicação no Nest. Neste tipo tenho acesso a todos
  //os métodos e funcionalidades para manipular e gerenciar a aplicação conforme necessário ao longo
  // do ciclo de vida do servidor.
  //-------------------------------------------------
  //NestFactory é o método responsável por construir/instanciar a aplicação.
  //Ele espera receber o Module que contenham as definições necessárias para construir a aplicação.
  //-------------------------------------------------
  //Resumindo, esta próxima linha armazena na const app a criação de um projeto Nest com base nas
  //definições de AppModule, que passo por argumento. E no app, por ter utilizado o tipo
  //INestAplication eu tenho acesso a todos os métodos e funcionalidades que me permitirão desenvolver
  //e manipular o ciclo de vida da minha aplicação.
  const app: INestApplication = await NestFactory.create(AppModule);
  //.get - Este método é responsável por encontrar no container do Nest o serviço e instanciá-lo.
  //Ele vem daquele tipo que usamos lá encima, INestAplication
  //Ao utilizarmos deste método, estou instanciando o ConfigService(que deve ser instalado) que está
  //la no Container do Nest.
  //O container do Nest é responsável por criar, armazenar e fornecer instâncias de classes, serviços
  //e outros componentes necessários para o funcionamento da aplicação.
  //Geralmente interagimos com o Container de injeção de dependência através de decorators como
  //@Injectable(), @Controller(), @Inject() e métodos como app.get() para acessar e usar essas
  //dependências onde são necessárias dentro da sua aplicação.
  //-------------------------------------------------
  //ConfigService é um módulo oficial do Nest.js que oferece uma maneira simples de lidar com a
  //configuração da aplicação. Ele simplifica a leitura de variáveis de ambiente, arquivos de
  //configuração e outras fontes de configuração, permitindo que você acesse facilmente essas
  //configurações em toda a  aplicação.
  //Observações: Não há uma representação física. Interagimos com ele através dos Containers, métodos,
  //o .get(), por exemplo e as configurações feitas dentro dos arquivos do seu código (como
  //app.module.ts).
  const configService = app.get(ConfigService);
  //Bora agora para as configurações do Swagger
  //Armazeno no swaggerConfig a instância da classe DocumentBuilder()
  //DocumentBuilder() é a classe fornecida pelo Swagger para integrar com o Nest. Com ela podemos
  //construir/instanciar a configuração da documentação da API através dos métodos disponíveis na
  //classe.
  const swaggerConfig = new DocumentBuilder()
    //.setTitle() é o método disponível na classe DocumentBuilder() do Swagger que, conforme próprio
    //nome sugere, entitulamos a documentação da nossa API.
    .setTitle('Aplicação Revisão')
    //.Usamos .setDescription() para incluir a descrição da API, escopo por exemplo.
    .setDescription('Revisão módulo 4 - Arnia')
    //Por fim chamamos o .build para construir o objeto de configuração final que será usado pelo
    //Swagger.
    .addBearerAuth()
    .build();
  //Quando finalizei anteriormente com o build(), ele finalizou e construiu a configuração da
  //documentação agora eu preciso de fato criar a documentação.
  //-------------------------------------------------
  //SwaggerModule.createDocument() é usado exatamente para isso, ele cria a documentação a partir
  //da aplicação e as configurações da documentação, variáveis app e swaggerConfig, respectivamente,
  //declaradas anteriormente
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  //SwaggerModule.setup é uma função fornecida pelo pacote @nestjs/swagger que configura o Swagger
  //para a documentação da sua API no Nest.js.
  //O primeiro argumento que se espera é o endpoint onde a documentação estará disponível, o segundo
  //é a aplicação e o terceiro é o documento criado.
  SwaggerModule.setup('v1/docs', app, document);
  //Com o .setGlobalPrefix, podemos definir um prefixo global para todas as rotas da aplicação.
  //Neste caso, todas as rotas terão o prefixo 'v1/'.
  //-------------------------------------------------
  //Dizem que é útil para versionar a API.
  //É opcional
  //Uma vez a configuração feite, se acessar http://localhost:3001/v1/docs, já tenho acesso a
  //documentação, mas ainda não de forma organizada e com qualidade. Faremos isso na camada Controller
  //(afinal é essa a camada de conexão com as requisições) usando Tags e Decorators.
  app.setGlobalPrefix('v1/');
  //Feito tudo isso vamos iniciar o servidor da aplicação
  //Usamos o método listen para que fique "escutando" uma porta
  //Neste caso, defini uma porta, 3001 caso no não exista nenhuma porta informada nas variáveis
  //de ambiente, o arquivo .env.
  //Lembra que o configService facilita a leitura de variáveis de ambiente? Pois bem, o uso dele aqui
  //tem essa finalidade
  await app.listen(configService.get('APP_PORT') || 3001);
}
bootstrap();
