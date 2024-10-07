import request from '@/utils/request'
export function uploadsAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/uploads',
    method:'POST',
    params
  })
}

export function production_static(params) {
  return request({
    url: '/api/Admin/production_static',
    method: 'get',
    params
  })
}
export function outsource(params) {
  return request({
    url: '/api/Admin/outsource',
    method: 'get',
    params
  })
}
export function load_areas(params) {
  return request({
    url: '/api/load_areas',
    method: 'get',
    params
  })
}

export function load_menu(params) {
  return request({
    url: '/api/Admin/load_menu',
    method: 'get',
    params
  })
}

export function processs_template(params,method,isLine) {
  return request({
    url: '/api/Admin/processs_template'+(isLine?'/'+isLine:''),
    method,
    params,
	data:params
  })
}


export function adminrole(params,method,isLine) {
  return request({
    url: '/api/Admin/role'+(isLine?'/'+isLine:''),
    method,
    params
  })
}
export function department(params,method,isLine) {
  return request({
    url: '/api/Admin/department'+(isLine?'/'+isLine:''),
    method,
    params
  })
}
export function departmentSelect(params,method) {
  return request({
    url: '/api/Admin/department/select',
    method,
    params
  })
}

export function customerAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/customer'+(isLine?'/'+isLine:''),
    method,
    params
  })
}




export function adminAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/admin'+(isLine?'/'+isLine:''),
    method,
    params
  })
}

export function examineAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/admin/examine'+(isLine?'/'+isLine:''),
    method,
    params
  })
}


export function examine_status(params,method) {
  return request({
    url: '/api/Admin/admin/examine_status',
    method,
    params
  })
}


export function factorieAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/factorie'+(isLine?'/'+isLine:''),
    method,
    params
  })
}

export function compensationstatic(params,method) {
  return request({
    url: '/api/Admin/compensation/static',
    method,
    params
  })
}
export function personalAdmin(params,method) {
  return request({
    url: '/api/Admin/personal',
    method,
    params
  })
}
export function change_store(params,method) {
  return request({
    url: '/api/Admin/change_store',
    method,
    params
  })
}



export function colorAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/color'+(isLine?'/'+isLine:''),
    method,
    params
  })
}

export function sizeAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/size'+(isLine?'/'+isLine:''),
    method,
    params
  })
}
export function clothing_categoryAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/clothing_category'+(isLine?'/'+isLine:''),
    method,
    params
  })
}
export function clothing_partAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/clothing_part'+(isLine?'/'+isLine:''),
    method,
    params
  })
}

export function clothing_partselectAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/clothing_part/select'+(isLine?'/'+isLine:''),
    method,
    params
  })
}
export function part_templateAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/part_template'+(isLine?'/'+isLine:''),
    method,
    params
  })
}

export function print_templateAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/print_template'+(isLine?'/'+isLine:''),
    method,
    params
  })
}
export function styleAdmin(params,method,isLine) {
  return request({
    url: '/api/Admin/style'+(isLine?'/'+isLine:''),
    method,
    params,
    data:params
  })
}
export function cutting_bed(params,method,isLine) {
  return request({
    url: '/api/Admin/cutting_bed'+(isLine?'/'+isLine:''),
    method,
    params,
    data:params
  })
}
export function styleselect(params,method) {
  return request({
    url: '/Admin/style/select',
    method,
    params,
    data:params
  })
}
