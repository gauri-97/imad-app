package com.gaurisingh.imadapp;

import android.content.DialogInterface;
import android.nfc.Tag;
import android.os.StrictMode;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    TextView textview;
    EditText edittext;
    private static final String TAG="Main Activity"; @Override

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textview=(TextView) findViewById(R.id.textview);
        textview.setText("This is the new text");
        edittext=(EditText) findViewById(R.id.edittext);

        Button button=(Button) findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this,"Button has been clicked",Toast.LENGTH_LONG).show();
                String entered_text=edittext.getText().toString().trim();
                if(entered_text.isEmpty())
                {
                  showAlert();
                }
                else{
                    replaceText(entered_text);
                }
            }

        });
        Log.i(TAG,"inside on create");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.i(TAG,"inside on resume");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.i(TAG,"inside on pause");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.i(TAG,"inside on destroy");
    }

    private void replaceText(String newtext)
    {
        textview.setText(newtext);
        edittext.setText("");
    }
    private void showAlert()
    {
        AlertDialog.Builder builder=new AlertDialog.Builder(this);
        builder.setTitle("Empty!");
        builder.setMessage("No String to replace!");
        builder.setNeutralButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }

                });
                builder.show();
    }
}
