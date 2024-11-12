// La clase ConfiguracionMemeApp sigue el patrón Singleton para asegurar que solo exista
// una instancia de configuración global en toda la aplicación, evitando conflictos de acceso.
class ConfiguracionMemeApp {
  constructor() {
    // Si ya existe una instancia de ConfiguracionMemeApp, regresamos esa misma.
    if (ConfiguracionMemeApp.instance) {
      return ConfiguracionMemeApp.instance;
    }

    // Configuración inicial de la aplicación.
    this.settings = {
      apiURL: "https://memesapi.com/api",
      language: "es",
    };

    // Guardamos la instancia para asegurarnos de que no se creen nuevas instancias.
    ConfiguracionMemeApp.instance = this;
  }

  // Método estático que proporciona acceso a la única instancia de configuración.
  static getInstance() {
    if (!ConfiguracionMemeApp.instance) {
      ConfiguracionMemeApp.instance = new ConfiguracionMemeApp();
    }
    return ConfiguracionMemeApp.instance;
  }
}

module.exports = ConfiguracionMemeApp;
