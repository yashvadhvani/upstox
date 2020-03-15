# Start

Please go to the project directory and hit the following command

```sh 
bash start_all_workers.sh
```
 
After runnin this command chromw window will open you can see the socket output in the chrome developer console


# Stop

After complete flow please stop the workers using the following command

```sh
bash stop_all_workers.sh
```

# Info

This solution has three workers

 1. Reader for reading the trades file 
 2. FSM to compute and maintain the OHLC points
 3. Socker server to send the socket client the calculated data

 I have also created one socket client which listens on the 8081 port. when you run the start script you can see the client running and showing live data.