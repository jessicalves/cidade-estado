import { promises as fs } from 'fs';

init();

async function init() {
  //await criarArquivoJson();

  //await cincoEstadosComMaisCidades();
  //await cincoEstadosComMenosCidades();
  await maiorNomeCadaEstado();
}

async function criarArquivoJson() {
  const dataEstados = JSON.parse(await fs.readFile('./Estados.json'));
  const dataCidades = JSON.parse(await fs.readFile('./Cidades.json'));

  for (let estado of dataEstados) {
    const CidadeEstado = dataCidades.filter(
      (cidade) => cidade.Estado === estado.ID
    );
    await fs.writeFile(
      `./CidadeEstado/${estado.Sigla}.json`,
      JSON.stringify(CidadeEstado)
    );
  }

  /* //outra forma de fazer
    dataEstados.forEach((estado) => {
      let arrayCidades = [];
      const obj = {
        cidades: arrayCidades,
      };
      dataCidades.forEach((cidade) => {
        if (estado.ID === cidade.Estado) {
          arrayCidades.push(cidade);
          fs.writeFile(
            './CidadeEstado/' + estado.Sigla + '.json',
            JSON.stringify(obj)
          );
        }
      });
    });*/
}

async function contadorCidades(uf) {
  const data = JSON.parse(await fs.readFile(`./CidadeEstado/${uf}.json`));
  //console.log(data.length);
  return data.length; //está retornando Promise { <pending> } ???????
}

async function cincoEstadosComMaisCidades() {
  const dataEstados = JSON.parse(await fs.readFile('./Estados.json'));
  let arrayCidades = [];

  for (let i = 0; i < dataEstados.length; i++) {
    const data = JSON.parse(
      await fs.readFile(`./CidadeEstado/${dataEstados[i].Sigla}.json`)
    );
    const qtde = data.length;
    arrayCidades.push({ sigla: dataEstados[i].Sigla, qtde });
  }
  arrayCidades.sort((a, b) => {
    if (a.qtde < b.qtde) {
      return 1;
    } else if (a.qtde > b.qtde) {
      return -1;
    } else return 0;
  });

  const arrayCidadesComMais = [];

  arrayCidades
    .slice(0, 5)
    .forEach((item) =>
      arrayCidadesComMais.push(item.sigla + ' - ' + item.qtde)
    );

  console.log(arrayCidadesComMais);
}

async function cincoEstadosComMenosCidades() {
  const dataEstados = JSON.parse(await fs.readFile('./Estados.json'));
  let arrayCidades = [];

  for (let i = 0; i < dataEstados.length; i++) {
    const data = JSON.parse(
      await fs.readFile(`./CidadeEstado/${dataEstados[i].Sigla}.json`)
    );
    const qtde = data.length;
    arrayCidades.push({ sigla: dataEstados[i].Sigla, qtde });
  }
  arrayCidades.sort((a, b) => {
    if (a.qtde < b.qtde) {
      return -1;
    } else if (a.qtde > b.qtde) {
      return 1;
    } else return 0;
  });

  const arrayCidadesComMenos = [];

  arrayCidades
    .slice(0, 5)
    .forEach((item) =>
      arrayCidadesComMenos.push(item.sigla + ' - ' + item.qtde)
    );

  console.log(arrayCidadesComMenos);
}

async function maiorNomeCadaEstado() {
  //parei aqui
}
