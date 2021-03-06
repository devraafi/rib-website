import { Observable } from 'rxjs';
declare interface IHandleRequest {
  obs: Observable<any>;
  successMessage?: string;
  useService?: boolean;
  errorMessage?: string;
  onDone?: (res: any) => void;
  onError?: (err: any) => void;
  onTap?: (res: any) => void;
}
