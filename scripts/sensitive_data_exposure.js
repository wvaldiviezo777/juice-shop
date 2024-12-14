// Importo el módulo path
// Importo el módulo fs para manipular archivos
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Ruta del archivo de log
const logFilePath = path.join(__dirname, '../logs/access.log.2024-12-14');

// Redirigir console.log para guardar los logs en un archivo
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
console.log = function (message) {
    logStream.write(`[${new Date().toISOString()}] ${message}\n`);
};

// Genero una función para extraer el contenido de la página web
async function obtenerContenidoDePagina(url) {
    const browser = await puppeteer.launch({ headless: true, timeout: 30000 });  // Timeout de 30 segundos
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });  // Tiempo de espera por defecto
        const contenido = await page.content();
        await browser.close();
        return contenido;
    } catch (error) {
        await browser.close();
        throw new Error(`Error al cargar la página ${url}: ${error.message}`);
    }
}

// Genero una función para buscar direcciones IP en el texto
function buscarIpsEnTexto(texto) {
    const patron = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;  // Expresión regular para IPs
    const ips = texto.match(patron);
    return ips ? [...new Set(ips)] : [];  // Elimino duplicados usando Set
}

// Genero la función principal
async function verificarIpsEnPagina() {
    const url = 'http://localhost:3000/rest/admin/application-configuration';
    
    try {
        // Obtengo el contenido de la página
        const contenido = await obtenerContenidoDePagina(url);
        
        // Busco las IPs en el contenido
        const ipsEncontradas = buscarIpsEnTexto(contenido);
        
        if (ipsEncontradas.length > 0) {
            console.log(`Se encontraron las siguientes IPs:`);
            ipsEncontradas.forEach(ip => console.log(ip));
        } else {
            console.log('No se encontraron IPs en el contenido de la página.');
        }

        // Guardar IPs encontradas en un archivo (opcional)
        const resultado = ipsEncontradas.length > 0 ? ipsEncontradas.join('\n') : 'No se encontraron IPs.';
        fs.writeFileSync('resultado_ips.txt', resultado);
    } catch (error) {
        console.error('Error al verificar las IPs:', error);
    }
}

// Ejecuto la función principal
verificarIpsEnPagina();
