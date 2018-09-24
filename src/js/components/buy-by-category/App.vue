
<template>
  <div class="js-vue-buy-by-category">
    <Department v-for="department in departments" :key="department[0].id" :id="department[0].id" :titulo="department[0].name" :categories="department[0].children" :url="department[0].url"/>
  </div>
</template>

<script>

  import Department from './components/Department.vue';
  import vtexRequest from '../../modules/vtexRequest';


  export default {
    components: {
      Department
    },
    async created(){
      const departments = $('.js-department-ids').html().split(',');
      const api = new vtexRequest();
      const categoryTree = await api.getCategoryTree(2);
      const filterCategoryByDepartment = (categories, departmentID) => {
        const filteredCategories = categories.filter(category => category.id == parseInt(departmentID))
        return filteredCategories;
      }
      const categoriesByDepartement = departments.map(departmentID => filterCategoryByDepartment(categoryTree, departmentID));
      console.log(...categoriesByDepartement)
      this.departments.push(...categoriesByDepartement);
    },
    data () {
      return {
        departments: []
      }
    },
    method: {

    }

  }
</script>

