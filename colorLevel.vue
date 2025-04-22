<template>
  <AModal
    width="auto" :visible="visible" :title="title" draggable :mask-closable="false"
    ok-text="xxxxxxx" :footer="footer" @ok="handleOk" @cancel="handleCancel"
    @update:visible="handleVisibleChange"
  >
    <div class="color-level-table">
      <!-- 表格头部 -->
      <div class="table-header" @click="handleHeaderClick">
        <div v-for="(header, index) in headers" :key="index" class="header-cell">
          {{ header }}
        </div>
      </div>

      <!-- 表格内容 -->
      <div class="table-body">
        <div
          v-for="(row, rowIndex) in tableData"
          :key="rowIndex"
          class="table-row"
          @click="handleRowClick(row, rowIndex)"
        >
          <div class="body-cell" @click.stop="handleCellClick('level', rowIndex)">
            {{ row.level }}
          </div>
          <div class="body-cell" @click.stop="handleCellClick('line', rowIndex)">
            {{ row.lineType }}
          </div>
          <div
            class="body-cell color-cell"
            :style="{ backgroundColor: row.color }"
            @click.stop="handleCellClick('color', rowIndex)"
          ></div>
        </div>
      </div>
    </div>
  </AModal>
</template>

<script setup>
import { Modal as AModal } from '@arco-design/web-vue'
import { ref } from 'vue'

const emit = defineEmits(['update:visible', 'ok', 'cancel'])

// 表格配置
const headers = ref(['层级', '线形', '颜色'])
const tableData = ref([
  { level: 1, lineType: '实线', color: '#FF0000' },
  { level: 2, lineType: '虚线', color: '#00FF00' },
  { level: 3, lineType: '点线', color: '#0000FF' },
])

// 事件处理
const handleHeaderClick = (event) => {
  const headerText = event.target.innerText
  console.log(`点击了表头：${headerText}`)
  // 这里可以添加排序逻辑
}

const handleRowClick = (row, index) => {
  console.log('点击了行：', row, index)
}

const handleCellClick = (type, index) => {
  console.log(`点击了单元格类型：${type}，行索引：${index}`)
  // 这里可以添加具体单元格处理逻辑
}

// 定义Rainbow色阶  这个是.clr文件中的内容
/* const rainbowColors = [
  [0.0, '#FF0000'], // 红，t=0.0
  [0.25, '#FF7F00'], // 橙，t=0.25
  [0.5, '#FFFF00'], // 黄，t=0.5
  [0.70, '#1FDAE5'], // 绿，t=0.75
  [0.75, '#00FF00'], // 绿，t=0.75
  [1.0, '#8B00FF'], // 紫，t=1.0
] */

const handleOk = () => {
  const emitData = {}
  emit('ok', emitData)
  emit('update:visible', false)
}

// 处理取消按钮点击事件
const handleCancel = () => {
  emit('cancel')
  emit('update:visible', false)
}

// 处理 visible 状态变化
const handleVisibleChange = (newVisible) => {
  emit('update:visible', newVisible)
}
</script>

<style lang="scss" scoped>
.color-level-table {
  width: 600px;
  border: 1px solid #e5e5e5;

  .table-header, .table-row {
    display: flex;
    padding: 8px 0;
    border-bottom: 1px solid #eee;

    .header-cell, .body-cell {
      flex: 1;
      padding: 0 12px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f5f5f5;
      }
    }

    .color-cell {
      width: 50px;
      height: 24px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
  }

  .table-header {
    font-weight: bold;
    background-color: #f8f8f8;
  }
}
</style>
