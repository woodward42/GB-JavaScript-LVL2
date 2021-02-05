export const Search = {
    data(){
        return {
            searchLine: '',
        }
    },
    template: `<form action="#" class="search-form">
                    <input type="text" class="search-field" v-model="searchLine">
                    <button class="btn-search" type="submit" @click.prevent="$root.$refs.catalog.filterProducts(searchLine)">
                        <i class="fas fa-search"></i>
                    </button>
              </form>`
}