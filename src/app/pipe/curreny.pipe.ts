
import { Pipe, PipeTransform, inject} from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'curreny',
  pure: true,
  standalone: true,
})
export class CurrenyPipe implements PipeTransform {

  private currencyPipe = inject(CurrencyPipe);
 

  transform(value: number, timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone): string | null {
    const currencyCode = this.getCurrencyCodeFromTimezone(timezone);
    return this.currencyPipe.transform(value, currencyCode);
  }

  private getCurrencyCodeFromTimezone(timezone: string): string {
    const timezoneCurrencyMap: { [key: string]: string } = {
      'America/New_York': 'USD',
      'Europe/London': 'GBP',
      'Europe/Paris': 'EUR',
      'Asia/Kolkata': 'INR',
      'Asia/Tokyo': 'JPY',
      'Australia/Sydney': 'AUD',
      'Asia/Seoul': 'KRW', 
    };

    return timezoneCurrencyMap[timezone] || 'INR'; 
  }
}
