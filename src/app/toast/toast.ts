// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ToastMessage, ToastService } from '../service/toast.service';


// @Component({
//   selector: 'app-toast',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './toast.html',
//   styleUrls: ['./toast.css']
// })
// export class ToastComponent {
//   // Inject ToastService để truy cập danh sách thông báo
//   toastService = inject(ToastService);

//   // Dùng signal từ service để hiển thị list toasts
//   toasts = this.toastService.toasts;

//   getToastClasses(type: ToastMessage['type']) {
//     switch (type) {
//       case 'success':
//         return 'bg-green-500 text-white';
//       case 'error':
//         return 'bg-red-500 text-white';
//       case 'info':
//       default:
//         return 'bg-blue-500 text-white';
//     }
//   }

//   closeToast(id: number) {
//     this.toastService.remove(id);
//   }
// }
