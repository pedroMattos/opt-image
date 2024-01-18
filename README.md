
# Easy image optimization

It's a abstraction of image optimization using semantic html and optimization alghoritms with canvas, just give the source and get a optimized image in your selected resolutions to use as a component in your vue and react projects.
## Features

- Optimize image
- Resize
- Provides a webp image
- Works on javascript-based projects


## Instalation (Vue 3)

Install the project

```bash
  npm i @pedropmatt/easy-image-optimization
```
Import the script that will construct the component
```bash
  import "@pedropmatt/easy-image-optimization"
```
Just use it
```bash
  <opt-image :image-url="imageUrl" :resolutions="[200, 550, 1366]" />
```

## Instalation (React)

I'm trying to improve this instalation

```bash
  npm i @pedropmatt/easy-image-optimization
```

Import the script that will construct the component

```javascript
  useEffect(() => {
      import("@pedropmatt/easy-image-optimization")
  })
```

Just use it
```bash
  <opt-image :image-url="imageUrl" :resolutions="[200, 550, 1366]" />
```

    
## Usage (Vue 3)

```typescript
<script lang="ts" setup>
import "@pedropmatt/easy-image-optimization"

const imageUrl = computed(() => 'https://cdn.pixabay.com/photo/2023/12/14/07/44/dog-8448345_1280.jpg')
const resolutions = computed(() => [200, 550, 1366])
</script>

<template>
    <opt-image :image-url="imageUrl" :resolutions="resolutions" />
</template>
```

## Usage (React)

React will be display an error on your IDE, but the component works, I've be working hard to solve this problem and improve the instalation

```typescript
import { useEffect } from 'react'

const YourComponent = ({ imageUrl: string, resolutions: number[] | string[] }) => {
    useEffect(() => {
        import("@pedropmatt/easy-image-optimization")
    })

    return <opt-image image-url={imageUrl} :resolutions={resolutions} />
}

export default YourComponent
```


## Contributing

It's my first lib, I'm very happy that you want to contribute :)

Welcome! I'm happy to receive contributions to improve this library. Your help is valuable to me and the possible community that we will construct.

See the `contribution.md` to start.


## Roadmap

- Support to React projects.

- Lazyloads, decoding and dynamic fetchpriority.

- Improve otimization using noise and alpha compose.

- Skeleton image.

- SSR support.

- Avif support.
## Autores

- [@pedroMattos](https://github.com/pedroMattos)

