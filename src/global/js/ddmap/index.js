/**
 * @description   数据字典
 */

var ddmap = {
  sex: [ // 性别
    { key: '1', value: '男' },
    { key: '2', value: '女' },
  ],
  diploma: [ // 学历
    { key: '1', value: '研究生' },
    { key: '2', value: '大学本科' },
    { key: '3', value: '大专' },
    { key: '4', value: '中专' },
    { key: '5', value: '技术学校' },
    { key: '6', value: '高中' },
    { key: '7', value: '初中' },
    { key: '8', value: '小学' },
    { key: '9', value: '文盲或半文盲' },
    { key: '0', value: '未知' },
  ],
  degree: [ // 学位
    { key: '1', value: '名誉博士' },
    { key: '2', value: '博士' },
    { key: '3', value: '硕士' },
    { key: '4', value: '学士' },
    { key: '5', value: '其他' },
    { key: '6', value: '未知' },
  ],
  house: [ // 住宅类型
    { key: '1', value: '自置' },
    { key: '2', value: '按揭' },
    { key: '3', value: '亲属楼宇' },
    { key: '4', value: '集体宿舍' },
    { key: '5', value: '租房' },
    { key: '6', value: '共有住宅' },
    { key: '7', value: '其他' },
    { key: '8', value: '未知' },
  ],
  maritalStatus: [ // 婚姻状况
    { key: '1', value: '未婚' },
    { key: '2', value: '已婚' },
    { key: '3', value: '初婚' },
    { key: '4', value: '再婚' },
    { key: '5', value: '复婚' },
    { key: '6', value: '丧偶' },
    { key: '7', value: '离婚' },
    { key: '8', value: '未知' },
  ],
  workUnitType: [ // 行业类型
    { key: '1', value: '制造业' },
    { key: '2', value: '电力、热力、燃气及水生产和供应业' },
    { key: '3', value: '批发和零售业' },
    { key: '4', value: '交通运输、仓储和邮政业' },
    { key: '5', value: '住宿和餐饮业' },
    { key: '6', value: '金融业' },
    { key: '7', value: '房地产业' },
    { key: '8', value: '租赁和商务服务业' },
    { key: '9', value: '科学研究和技术服务业' },
    { key: '10', value: '水利、环境和公共设施管理业' },
    { key: '11', value: '居民服务、修理和其他服务业' },
    { key: '12', value: '教育' },
    { key: '13', value: '卫生、社会保障和社会福利业' },
    { key: '14', value: '公共管理和社会组织' },
    { key: '15', value: '国际组织' },
    { key: '16', value: '信息传输、计算机服务和软件业' },
    { key: '17', value: '农、林、牧、渔业' },
    { key: '18', value: '采掘业' },
    { key: '19', value: '建筑业' },
    { key: '20', value: '未知' },
  ],
  occupation: [ // 职业
    { key: '1', value: '国家机关、党群组织、企业、事业单位负责人' },
    { key: '2', value: '专业技术人员' },
    { key: '3', value: '办事人员和有关人员' },
    { key: '4', value: '商业、服务业人员' },
    { key: '5', value: '农、林、牧、渔、水利业生产人员' },
    { key: '6', value: '生产、运输设备操作人员及有关人员' },
    { key: '7', value: '军人' },
    { key: '8', value: '不便分类的其他从业人员' },
  ],
  workUnitJob: [ // 职务/职位
    { key: '1', value: '高管' },
    { key: '2', value: '中层' },
    { key: '3', value: '职员' },
    { key: '4', value: '其他' },
  ],
  ranks: [ // 职称
    { key: '1', value: '高级' },
    { key: '2', value: '中级' },
    { key: '3', value: '初级' },
    { key: '9', value: '未知' },
  ],
}

var handleMap = (ddmap) => {
  for(var key in ddmap) {
    ddmap[key] = ddmap[key].map((item, index) => {
      return item.value;
    });
  }
  return ddmap;
}

export default ddmap
