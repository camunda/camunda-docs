# Idempotent message correlation

This example starts three processes that wait on a correlated payment message,
then immediately publishes each message twice with the same stable ID.

```sh
php examples/advanced/message-correlation/main.php
```

The message TTL covers the process-start-to-subscription interval, and the
stable message ID makes at-least-once producer redelivery safe during the
broker's duplicate-protection window. Every process is verified as completed.
