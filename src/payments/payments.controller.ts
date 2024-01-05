import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentsDto } from './dtos/create-payments.dto';

@Controller()
export class PaymentsMicroserviceController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {
  }

  @EventPattern('createPayment')
  createPayment(@Payload() createPayment: CreatePaymentsDto) {
    console.log('Received message in payment controller --------------');
    console.log(createPayment);
    console.log('-----------------------------------------------------');
    this.natsClient.emit('paymentCreated', createPayment);
    return '';
  }
}
