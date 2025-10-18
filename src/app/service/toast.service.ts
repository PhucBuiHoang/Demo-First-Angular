// import { Injectable, signal, WritableSignal } from '@angular/core';

// export interface ToastMessage {
//     id: number;
//     message: string;
//     type: 'success' | 'error' | 'info';
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class ToastService {
//     // Signal chứa danh sách các thông báo hiện tại
//     toasts: WritableSignal<ToastMessage[]> = signal([]);
//     private nextId = 0;
//     private readonly TIMEOUT = 3000; // Thời gian hiển thị mặc định: 3 giây

//     // Phương thức hiển thị thông báo
//     show(message: string, type: ToastMessage['type'] = 'info') {
//         const id = this.nextId++;
//         const newToast: ToastMessage = { id, message, type };

//         // Thêm thông báo mới vào đầu danh sách
//         this.toasts.update(currentToasts => [newToast, ...currentToasts]);

//         // Thiết lập hẹn giờ để tự động đóng
//         setTimeout(() => this.remove(id), this.TIMEOUT);
//     }

//     // Phương thức xóa thông báo
//     remove(id: number) {
//         this.toasts.update(currentToasts => currentToasts.filter(toast => toast.id !== id));
//     }

//     // Các phương thức tiện lợi
//     success(message: string) {
//         this.show(message, 'success');
//     }

//     error(message: string) {
//         this.show(message, 'error');
//     }
// }
