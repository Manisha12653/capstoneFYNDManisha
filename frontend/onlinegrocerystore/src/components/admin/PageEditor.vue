<template>
  <div>
    <h2 class="text-center p-2">
      {{ editMode ? "Edit Page" : "Add Page" }}
    </h2>

    <div class="form-group">
      <label for="">Name</label>
      <input type="text" class="form-control" v-model="page.name" />
    </div>

    <div class="form-group">
      <label for="">Slug</label>
      <input type="text" class="form-control" v-model="page.slug" />
    </div>
    <div class="text-center">
      <router-link class="btn btn-secondary m-1" to="/admin/pages"
        >Back</router-link
      >
      <button class="btn btn-primary m-1" @click="handlePage">
        {{ editMode ? "Edit" : "Add" }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      page: {
        name: null,
        slug: null,
        content: null,
      },
    };
  },
  computed: {
    editMode() {
      return this.$route.params["op"] == "edit";
    },
  },

  methods: {
    ...mapActions(["addPage", "editPage"]),
    async handlePage() {
      if (this.editMode) {
        await this.editPage(this.page);
      } else {
        await this.addPage(this.page);
      }

      this.$router.push("/admin/pages");
    },
  },
  created() {
    if (this.editMode) {
      Object.assign(
        this.page,
        this.$store.getters.pageById(this.$route.params["id"])
      );
    }
  },
};
</script>
