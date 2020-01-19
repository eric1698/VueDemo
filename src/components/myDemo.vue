<template>
  <div>
    <b-container>
      <b-input-group>
        <b-button variant="outline-secondary" v-b-modal.Create size="sm" class="mr-1">新增</b-button>
      </b-input-group>

      <div>
        <b-table
          striped
          hover
          :items="TableItems"
          id="my-table"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
        >
          <template v-slot:cell(actions)="row">
            <b-button v-b-modal.Edit size="sm" class="mr-1" @click="SelectItem(row.item)">Edit</b-button>
            <b-button v-b-modal.Delete size="sm" variant="danger" class="mr-1" @click="SelectItem(row.item)" >Delete</b-button>
          </template>
        </b-table>

        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </div>
    </b-container>

    <!--update template start-->
    <b-modal id="Edit" title="修改" v-if="SelectedItem">
      <b-container fluid>
        <b-row>
          <b-form-group label="姓名" label-for="name-input">
            <b-form-input id="name-input" v-model="SelectedItem.name"></b-form-input>
          </b-form-group>
        </b-row>
        <b-row>
          <b-form-group label="訊息" label-for="message-input">
            <b-form-textarea id="message-input" v-model="SelectedItem.message"></b-form-textarea>
          </b-form-group>
        </b-row>
      </b-container>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="lm" @click="cancel()">cancel</b-button>
        <b-button size="lm" variant="success" @click="ok();Edit()">修改</b-button>
      </template>
    </b-modal>
    <!--update template end-->

    <!--create template start-->
    <b-modal id="Create" title="新增">
      <b-container fluid>
        <b-row>
          <b-form-group label="姓名" label-for="name-input">
            <b-form-input></b-form-input>
          </b-form-group>
        </b-row>
        <b-row>
          <b-form-group label="訊息" label-for="message-input">
            <b-form-textarea id="message-input" v-model="AddArg.message"></b-form-textarea>
          </b-form-group>
        </b-row>
      </b-container>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="lm" @click="cancel()">cancel</b-button>
        <b-button size="lm" variant="success" @click="ok();Insert()">新增</b-button>
      </template>
    </b-modal>
    <!--create template end-->

    <!--delete template start-->
    <b-modal id="Delete" title="刪除" v-if="SelectedItem">
      <b-container>
        <b-row>
          <b-col cols="3">ID</b-col>
          <b-col cols="auto">{{SelectedItem.contentId}}</b-col>
        </b-row>
        <b-row>
          <b-col cols="3">訊息</b-col>
          <b-col cols="auto">{{SelectedItem.message}}</b-col>
        </b-row>-->
        <b-row>
          <b-col cols="3">姓名</b-col>
          <b-col cols="auto">{{SelectedItem.name}}</b-col>
        </b-row>
        <b-row>
          <b-col cols="3" class="justify-content-md-center">修改時間</b-col>
          <b-col cols="auto">{{SelectedItem.modifyTime}}</b-col>
        </b-row>
        <b-row>
          <b-col cols="3">建立時間</b-col>
          <b-col cols="auto">{{this.SelectedItem.createTime}}</b-col>
          <b-col></b-col>
        </b-row>
      </b-container>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="lm" @click="cancel()">cancel</b-button>
        <b-button size="lm" variant="danger" @click="ok();Delete()">刪除</b-button>
      </template>
    </b-modal>
    <!--delete template end-->
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      TableItems: null,
      AddArg: {
        message: "",
        name: ""
      },
      fields: [
        {
          key: "contentId",
          label: "Id",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "name",
          label: "姓名",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "message",
          label: "訊息",
          sortable: true,
          class: "text-center"
        },
        {
          key: "modifyTime",
          label: "修改時間",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "createTime",
          label: "建立時間",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "actions", label: "操作" }
      ],
      SelectedItem: null
    };
  },
  created() {
    this.Read();
  },
  computed: {
    rows() {
      return this.TableItems == null ? 0 : this.TableItems.length;
    }
  },
  methods: {
    Read() {
      this.$api
        .getDemoData()
        .then(res => {
          this.TableItems = res.data;
        })
        .catch(res => {
          alert("異常");
        });
    },
    Insert() {
      this.$api
        .createDemoData(this.AddArg)
        .then(res => {
          if (res.data.ret == "新增成功") {
            this.AddArg.message = "";
            this.AddArg.name = "";
            this.Read();
          } else alert(res.data.ret);
        })
        .catch(res => {
          alert(res);
        });
    },
    Edit() {
      this.$api.updateDemoData(this.SelectedItem).then(res => {
        if (res.data.ret == "更新成功") {
          this.Read();
        } else alert(res.data.ret);
      });
    },
    Delete() {
      this.$api.deleteDemoData(this.SelectedItem.contentId).then(res => {
        if (res.data.ret == "刪除成功") this.Read();
        else alert(res.data.ret);
      });
    },
    SelectItem: function(Item) {
      this.SelectedItem = Item;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
