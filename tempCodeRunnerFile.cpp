#include <bits/stdc++.h>
using namespace std;

void solve() {
    
}

int main() {
    // Fast I/O
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int t;
    cin >> t;

    while (t--) {
        solve();
        int a,b;
        cin>>a>>b;
        int x=0;
        int cnt=0;
        vector<int>track;
        while(x<max(a,b)){
            a=a^x;
            if(a==b){
                cout<<(cnt+1)<<endl;
                for(int i=0;i<track.size();i++){
                    cout<<track[i]<<" ";
                }
            }
            cnt++;
            track.push_back(x);
              
        }
        cout<<-1<<endl;

    }

    return 0;
}