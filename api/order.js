import request from "@/utils/request";

export function apiGetOrders() {
  return request({
    url: "/wx/order/query",
    method: "get",
  });
}

export function apiCreateOrder(data) {
  return request({
    url: "/wx/order/add",
    method: "post",
    data
  });
}

export function apiOrderDetail(id){
  return request({
    url: "/wx/order/detail",
    method: "get",
    data: {
      id
    }
  });
}