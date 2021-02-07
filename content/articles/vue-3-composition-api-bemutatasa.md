---
title: Vue 3 Composition API bemutatása  
description: "Bemutatkozik a Composition API: kiegészítő, függvény alapú API-k gyűjteménye, amelyek a komponens logika rugalmas kompozícióját teszik lehetővé."
author:
  name: Légrádi Szabolcs
tags: ["Vue.js", "Composition API"]
---

# Vue 3 Composition API bemutatása

Tavaly szeptemberi megjelenésével a Vue 3 több, mint 2 évnyi munka eredményeként rengeteg újdonságot hozott: jobb performancia, kisebb méret, jobb TypeScript integráció, új API-k nagyobb projektekhez és egy stabil alap a keretrendszer jövőbeni fejlesztéséhez.

A következőkben a Composition API működését fogom bemutatni egy egyszerű todo alkalmazás példáján keresztül.

## Mi az a Composition API?

A Vue egyre szélesebb körű terjedésével növekszik azon fejlesztők száma is, akik nagy projektekhez használják: olyan projektekhez, amiket hosszú időn keresztül több fejlesztőből álló csapatok fejlesztenek és tartanak karban. Az évek során a Vue készítői felismerték, hogy az ilyen projektek egy része limitációkba ütközik a 2-es verzió objektum alapú API-jával felállított programozási modell miatt. Ezek a problémák két kategóriába sorolhatók:

* A komplex komponensek kódja egyre nehezebben magyarázható, ahogy a funkciók száma növekszik az idő múlásával. Különösen akkor, amikor a fejlesztők mások által írt kódot kell értelmezzenek. Ennek oka, hogy a Vue meglévő API-ja a kód szervezését az Options API által nyújtott opciókba kényszeríti, de sokszor jobb lenne, ha logikai szempontok alapján lehetne ezt megtenni.
* Nincs egy egyszerű, költségmentes módja több komponensben is használt logika kiemelésére és újrahasznosítására.

A Composition API ezekre a problémákra nyújt megoldást a komponensek kódjának rugalmasabb szervezésével. Az opciókba kényszerített szervezés helyett immáron adott a lehetőség, hogy az önálló funkciók önálló függvényekbe kerüljenek és sokkal könnyebbé tették a logika újrahasznosítását különböző komponensek között vagy akár komponenseken kívül is.

## Todo alkalmazás készítése

A fejlesztés során a [Vite](https://vitejs.dev/) csomagot fogjuk használni fejlesztői környezetként, amit Evan You (a Vue.js készítője) és társai készítettek. Ez egy villámgyors eszköz, amivel mind a fejlesztés, mind a buildek készítése másodpercek töredéke alatt megtörténik. A mi egyszerű todo alkalmazásunk fejlesztésekor fel se fog tűnni, hogy a háttérben a kód lefordul és automatikusan frissül a böngészőben látott verzió is.

Hozzuk létre tehát az alkalmazásunkat:
```bash
npm init @vitejs/app todo --template vue
```

A létrehozást követően lépjünk be a mappába, telepítsük a csomagokat, majd indítsuk el:
```bash
cd todo
npm install
npm run dev
```

Az alkalmazást ezután a <a href="http://localhost:3000/" target="_blank" rel="noopener">http://localhost:3000/</a> címen érjük el.  
A minta `HelloWorld` komponens törlését követően lássunk neki a munkához.

Az egyszerűség kedvéért most egyetlen komponensben fogunk dolgozni, de egy való életbeli alkalmazás esetén ügyeljünk a komponensek és felelősségek különválasztására. Szükségünk lesz egy tömbre, amiben a teendőket tároljuk, illetve egy inputra, ahol azokat felvihetjük.

### Új teendő hozzáadása

Hozzuk létre a `src/components/TodoList.vue` fájlt, ahol egy inputba megadhatjuk a következő teendőt:
```vue[src/components/TodoList.vue]
<template>
  <input type="text" v-model="todo" placeholder="Teendő">
  {{ todo }}
</template>

<script>
export default {
  setup () {
    const todo = ''
    
    return {
      todo
    }
  }
}
</script>
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="szlegradi" data-slug-hash="jOMzGbj" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="jOMzGbj">
  <span>See the Pen <a href="https://codepen.io/szlegradi/pen/jOMzGbj">
  jOMzGbj</a> by Szabolcs Légrádi (<a href="https://codepen.io/szlegradi">@szlegradi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<base-note>A CodePen példákban a Vue CDN-en elérhető verziója van betöltve, ahol minden függvény a `Vue` névtér alatt található.</base-note>

A `setup` függvény szolgál a kompozíciós függvények helyéül. Itt definiálhatjuk a változókat, metódusokat és a kalkulált (`computed`) mezőket, amik a komponensünk számára elérhetőek lesznek. Láthatjuk, hogy bár a templateben megjelenítjük a `todo` értékét és az input elemünkön is szerepel a `v-model`, a beírt érték mégse frissül.

Ennek oka, hogy a `todo` változó nem reaktív, így változás esetén nem frissül a DOM.  
Tegyük hát reaktívvá a `ref` függvény segítségével.

A `ref` a Reactive Reference, vagyis reaktív referencia rövidítése, nem csinál mást, mint a paraméterben átadott értéket egy objektumba csomagolja, aminek lesz egy `value` mezője.

```vue{7,11}[components/TodoList.vue]
<template>
  <input type="text" v-model="todo" placeholder="Teendő">
  <p>{{ todo }}</p>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const todo = ref('')
    
    return {
      todo
    }
  }
}
</script>
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="szlegradi" data-slug-hash="JjRLQqV" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Vue 3 Composition API - TodoList reaktív input">
  <span>See the Pen <a href="https://codepen.io/szlegradi/pen/JjRLQqV">
  Vue 3 Composition API - TodoList reaktív input</a> by Szabolcs Légrádi (<a href="https://codepen.io/szlegradi">@szlegradi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Máris látható, hogy működik a DOM és a model közötti szinkron! Fontos, hogy render kontextusban (ez a `setup` függvény által visszaadott objektum) a `ref` kicsomagolására nincs szükség (vagyis nem kell `todo.value`-ként hivatkoznunk rá), ez <a href="https://v3.vuejs.org/guide/reactivity-fundamentals.html#ref-unwrapping" target="_blank" rel="noopener">automatikusan megtörténik</a>.

### Teendők listázása és hozzáadása

Következő lépésként listázzuk a teendőinket: ehhez létrehozunk egy tömböt, amiben tárolni fogjuk őket. Minden teendőnek lesz egy címe, illetve egy `completed` mezője, ami jelzi, hogy az adott feladat el lett-e már végezve vagy sem.

```vue[src/components/TodoList.vue]
<template>
  <input type="text" v-model="todo" placeholder="Teendő" @keyup.enter="addTodo">
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" v-model="todo.completed">
      {{ todo.title }}
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const todo = ref('')
    const todos = ref([])
    let id = 0
    
    function addTodo () {
      todos.value.push({
        id: id,
        title: todo.value.trim(),
        completed: false
      })
      
      todo.value = ''
      id++
    }
    
    return {
      todo,
      todos,
      addTodo
    }
  }
}
</script>
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="szlegradi" data-slug-hash="MWjVNWX" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Vue 3 Composition API - TodoList teendők listázása">
  <span>See the Pen <a href="https://codepen.io/szlegradi/pen/MWjVNWX">
  Vue 3 Composition API - TodoList teendők listázása</a> by Szabolcs Légrádi (<a href="https://codepen.io/szlegradi">@szlegradi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Látható, hogy a `setup` függvényen belül az adott változó `value` mezőjére kell hivatkoznunk, azon keresztül érjük el az adott típusra vonatkozó metódusokat. Az új teendő hozzáadását követően a DOM azonnal frissül és megjelenik a legutóbb hozzáadott feladat.

### Reagálás a változásokra

Tegyük fel, hogy kíváncsiak vagyunk a teendők számára minden alkalommal, amikor egy új teendőt felveszünk és ezt a konzolra ki akarjuk íratni. Ezt a `watch` függvénnyel tudjuk megtenni, ami 3 argumentumot fogad:

- egy **reaktív referenciát** vagy getter függvényt, amit vizsgálni akarunk
- egy callback függvényt
- opcionális konfigurációs beállításokat

```vue[src/components/TodoList.vue]
<template>
  <input type="text" v-model="todo" placeholder="Teendő" @keyup.enter="addTodo">
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" v-model="todo.completed">
      {{ todo.title }}
    </li>
  </ul>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  setup () {
    const todo = ref('')
    const todos = ref([])
    let id = 0
        
    function addTodo () {
      todos.value.push({
        id: id,
        title: todo.value.trim(),
        completed: false
      })
      
      todo.value = ''
      id++
    }
    
    watch(todos, (newValue, oldValue) => {
      console.log(`A teendők új száma: ${newValue.length}`) 
    }, { deep: true })    

    return {
      todo,
      todos,
      addTodo
    }
  }
}
</script>
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="szlegradi" data-slug-hash="MWjVNNN" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Vue 3 Composition API - TodoList reagálás a változásokra">
  <span>See the Pen <a href="https://codepen.io/szlegradi/pen/MWjVNNN">
  Vue 3 Composition API - TodoList reagálás a változásokra</a> by Szabolcs Légrádi (<a href="https://codepen.io/szlegradi">@szlegradi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

A konzolt megnyitva láthatjuk, hogy a teendők hozzáadásakor naplózásra kerül azok száma. Mivel tömböt vizsgálunk, ezért a `deep: true` beállítást is átadtuk a függvénynek, máskülönben csak akkor értesülnénk a változásokról, ha a `todos` változóra való referencia megváltozna. Primítv értékek esetén (mint számok vagy stringek) a `deep` beállításra nincs szükség.

### Önálló `computed` mezők

Hasonlóan a `ref` és `watch` függvényekhez, kalkulált mezőket is létrehozhatunk a `computed` függvénnyel. Készítsünk egyet, amivel az elkészült feladatok számát tudjuk megjeleníteni a felületen.

```vue[src/components/TodoList.vue]
<template>
  <input type="text" v-model="todo" placeholder="Teendő" @keyup.enter="addTodo">
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" v-model="todo.completed">
      {{ todo.title }}
    </li>
  </ul>
  
  <p>Elkészült feladatok száma: {{ numberOfCompletedTodos }}</p>
</template>

<script>
import { computed, ref, watch } from 'vue'

export default {
  setup () {
    const todo = ref('')
    const todos = ref([])
    let id = 0
    
    const numberOfCompletedTodos = computed(() => 
      todos.value.filter(todo => todo.completed).length
    )
    
    function addTodo () {
      todos.value.push({
        id: id,
        title: todo.value.trim(),
        completed: false
      })
      
      todo.value = ''
      id++
    }
    
    watch(todos, (newValue, oldValue) => {
      console.log(`A teendők új száma: ${newValue.length}`) 
    }, { deep: true })    

    return {
      todo,
      todos,
      addTodo,
      numberOfCompletedTodos
    }
  }
}
</script>
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="szlegradi" data-slug-hash="vYXjBxd" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Vue 3 Composition API - TodoList computed mezők">
  <span>See the Pen <a href="https://codepen.io/szlegradi/pen/vYXjBxd">
  Vue 3 Composition API - TodoList computed mezők</a> by Szabolcs Légrádi (<a href="https://codepen.io/szlegradi">@szlegradi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Egy-egy feladat elvégzését követően láthatjuk az elkészült feladatok számát frissülni.

Ezzel készen is vagyunk!

## Összegzés

Izgalmas lesz látni, hogy miként alakulnak át a nagyobb kódbázisok a közeljövőben és milyen Composition API alapú megoldásokkal fog előrukkolni a fejlesztői közösség.

A cikkben csak a felszínt kapargattuk, ha felkeltette az érdeklődésed és szeretnél még többet megtudni róla, akkor javaslom a <a href="https://v3.vuejs.org/guide/composition-api-introduction.html" target="_blank" rel="noopener">dokumentáció tanulmányozását</a>, illetve a már erre épülő megoldásokat, mint például a <a href="https://vueuse.js.org" target="_blank" rel="noopener">VueUse</a>, ami egy szép gyűjteménye alapvető utility függvényeknek.

<base-note>A cikkben elkészített projekt megtalálható <a href="https://github.com/markuphu/vue3-todo-example" target="_blank" rel="noopener">GitHub-on</a> és <a href="https://codepen.io/collection/DjRrBv" target="_blank" rel="noopener">CodePen-en</a>.</base-note>
