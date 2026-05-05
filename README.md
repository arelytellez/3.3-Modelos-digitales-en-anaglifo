# 🎮 Visor 3D Anaglifo con Three.js

Este proyecto es un visor 3D que utiliza modelos animados (FBX) y permite visualizarlos con efecto **anaglifo (rojo/azul)** usando lentes 3D. Está desarrollado con **Three.js** y utiliza **Bootstrap 5** para la interfaz.

---

## 🔴🔵 Características

* Visualización 3D con efecto anaglifo
* Carga de modelos FBX (exportados desde Mixamo)
* Animaciones incluidas en el modelo
* Entorno 3D con skybox
* Interacción con el mouse (movimiento de cámara)
* Interfaz con Navbar y Footer (Bootstrap 5)

---

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar o descargar el repositorio

```
git clone <url-del-repositorio>
```

---

## 🎯 Uso

1. Abre el proyecto en tu navegador
2. Usa lentes **rojo/azul**
3. Mueve el mouse para cambiar la vista
4. Observa el efecto de profundidad en el modelo 3D

---

## 🔧 Configuración importante

### Ajustar efecto 3D

En `main.js`:

```
effect.eyeSep = 0.08;
effect.planeDistance = 1.5;
```

---

### Ajustar tamaño del modelo

```
model.scale.set(0.04, 0.04, 0.04);
```

---

### Posición del modelo (profundidad)

```
model.position.set(0, -1, -1);
```

---

## ⚠️ Problemas comunes

### ❌ No carga el modelo

* Verifica la ruta en `/assets/models/`
* Asegúrate de usar servidor local

---

### ❌ Se ve oscuro

* Ajusta la iluminación en `main.js`
* Agrega luces ambientales y direccionales

---

### ❌ No se nota el 3D

* Incrementa `eyeSep`
* Ajusta `planeDistance`
* Coloca objetos a diferentes profundidades

---

## 👨‍💻 Autor

**Juan Fernando Ortega Olvera**
Proyecto académico de visualización 3D con Three.js

---

## 📌 Tecnologías utilizadas

* Three.js
* WebGL
* JavaScript (ES Modules)
* Bootstrap 5

---

## 📷 Créditos

* Modelos animados: Mixamo
* Skybox: Paul Debevec

---

## 🚀 Futuras mejoras

* Controles de cámara (OrbitControls)
* UI para cambiar animaciones
* Ajuste dinámico del efecto 3D
* Soporte para modelos GLB/GLTF

---

## 📄 Licencia

Este proyecto es de uso educativo.
