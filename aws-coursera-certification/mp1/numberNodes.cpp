#include <bits/stdc++.h>

const int N = 8;

  

int count1[N];

  

vector<int> adj[N];

  

void numberOfNodes(int s, int e)

{

    vector<int>::iterator u;

    count1[s] = 1;

    for (u = adj[s].begin(); u != adj[s].end(); u++) {

          

        

        

        if (*u == e)

            continue;

          

        

        numberOfNodes(*u, s);

          

        

        

        count1[s] += count1[*u];

    }

}

  

void addEdge(int a, int b)

{

    adj[a].push_back(b);

    adj[b].push_back(a);

}

  

void printNumberOfNodes()

{

    for (int i = 1; i < N; i++) {

        cout << "\nNodes in subtree of " << i;

        cout << ": " << count1[i];

    }

}

  

int main()

{

    

    addEdge(1, 2);

    addEdge(1, 4);

    addEdge(1, 5);

    addEdge(2, 6);

    addEdge(4, 3);

    addEdge(4, 7);

      

    

    

    numberOfNodes(1, 0);

      

    

    printNumberOfNodes();

    return 0;

}