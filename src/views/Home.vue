<template>
  <div id="building">
        <div class="login_title">
          <h2>Red Wine Anticounterfeiting Management Traceability System</h2>
        </div>

    <el-tabs type="border-card" style="width: 90%;margin: auto" stretch>
      <el-tab-pane label="Search for red wine">
        <el-form style="width: 85%;margin: auto">
          <el-form-item lable="Search" >
            <el-col :span="12">
              <el-form-item label="">
                <el-input v-model="info" placeholder="Please enter information"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="">
                <el-select v-model="value" placeholder="Select information type">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" @click="search">Search</el-button>
            </el-col>
          </el-form-item>

        </el-form>
        <el-table
          :data="tableData"
          height="400"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="BlockID"
          >
          </el-table-column>
          <el-table-column
            prop="Rwdata"
            label="RedWine"
          >
          </el-table-column>
          <el-table-column
            prop="timestamp"
            label="TimeStamp">
          </el-table-column>
          <el-table-column
            prop="previous_hash"
            label="PreviousHash">
          </el-table-column>
          <el-table-column
            prop="current_hash"
            label="CurrentHash">
          </el-table-column>
          <el-table-column
            prop="difficulty"
            label="Difficulty">
          </el-table-column>
          <el-table-column
            prop="proof"
            label="Proof">
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="Red Wine Information">
        <el-form  :model="form" label-width="105px" style="width: 95%;margin: auto" :rules="formRules" ref="formRules" prop="form">
          <el-form-item label="DealerName" prop="DealerName">
            <el-input v-model="form.DealerName" ></el-input>
          </el-form-item>
          <el-form-item label="Manufacturer" prop="Manufacturer">
            <el-input v-model="form.Manufacturer" ></el-input>
          </el-form-item>
          <el-form-item label="ProductionTime" >
            <el-col :span="11">
              <el-form-item label="" prop="ProductionTime" >
              <el-date-picker type="date" placeholder="Select the date" v-model="form.ProductionTime" picker-options="deadlineDate" style="width: 100%;" ></el-date-picker>
                </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="ProductionArea" prop="ProductionArea">
            <el-input v-model="form.ProductionArea" ></el-input>
          </el-form-item>
          <el-form-item label="LogisticsInformation" prop="LogisticsInformation">
            <el-input v-model="form.LogisticsInformation" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
export default {
  data() {
    return {
      deadlineDate: {
        disabledDate: (time) => {
          return time.getTime() > moment().subtract(1, 'days')
        }
      },
      form: {
        DealerName: '',
        Manufacturer: '',
        ProductionTime: '',
        ProductionArea:'',
        LogisticsInformation:''
      },
      formRules: {
        DealerName: [{
          message: "Please enter the DealerName",
          trigger: "blur"
        },
        ],
        Manufacturer: [{
          message: "Please enter the Manufacturer",
          trigger: "blur"
        },
        ],
        ProductionTime: [{
          required: true,
          message: "Please enter the ProductionTime",
          trigger: "blur"
        },
        ],
        ProductionArea:[{
          message: "Please enter the ProductionArea",
          trigger: "blur"
        }],
        LogisticsInformation:[{
          message: "Please enter the LogisticsInformation",
          trigger: "blur"
        }]

      },
      options: [{
        value: '1',
        label: 'DealerName'
      }, {
        value: '2',
        label: 'Manufacturer'
      },{
        value: '3',
        label: 'ProductionArea'
      },{
        value: '4',
        label: 'LogisticsInformation'
      }
      ],
      value: '',
      info:'',
      searchForm:{
        Info:'',
        Method:''
      },
      tableData: [],
      tableInfo:{
        id:'',
        Rwdata:'',
        timestamp:'',
        previous_hash:'',
        current_hash:'',
        difficulty:'',
        proof:''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.formRules.validate((valid) => {
        if (!valid) return;
        this.$axios.post("/api/rwinformation", this.qs.stringify(this.form), {
          headers:{
            "Content-Type": "application/json;charset=utf8"
          }
        }).then((
          res) => {
          console.log(res)
          if (res.status === 201) {
            this.$message.success("Red wine warehousing succeeded!");
          }
          else{
            this.$message.error("Failed to create red wine information");
          }
        })
      })
    },
    search(){
      this.searchForm.Info = this.info
      this.searchForm.Method = this.value
      this.$axios.post("/api/query", this.qs.stringify(this.searchForm), {
        headers:{
          "Content-Type": "application/json;charset=utf8"
        }
      }).then((
        res) => {
        console.log(res)
        if (res.data.message === 'successful') {
          this.tableData = res.data.blocks;
        }
        else{
          this.$message.error("Failed to search wine information");
        }
      })
    }
  }
}

</script>

<style scoped>
.login_title {
  text-align:center;
}

#building{
  background:url("../assets/back2.jpeg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>
